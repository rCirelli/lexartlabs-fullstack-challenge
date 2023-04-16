import * as cheerio from 'cheerio';

const urls = {
  mercadoLivre: {
    geladeira: 'https://lista.mercadolivre.com.br/eletrodomesticos/refrigeracao/geladeira/',
    tv: 'https://lista.mercadolivre.com.br/eletronicos-audio-video/tv/',
    celular: 'https://lista.mercadolivre.com.br/celulares-telefones/celular/',
  },
  buscape: {
    geladeira: 'https://www.buscape.com.br/geladeira',
    tv: 'https://www.buscape.com.br/tv',
    celular: 'https://www.buscape.com.br/celular',
  }
}

export type UrlParams = {
  source: keyof typeof urls | 'all';
  category: keyof typeof urls[keyof typeof urls];
  query: string;
}

type Product = {
  image: string;
  title: string;
  price: string;
  link: string;
}

async function scrapeBuscape(category: UrlParams['category'], query: UrlParams['query']) {
  let url = urls.buscape[category];
  if (query) {
    url = `https://www.buscape.com.br/search?q=${query}`
  }

  const response = await fetch(url);
  const page = await response.text();
  const $ = cheerio.load(page);

  const productCards: Product[] = []

  $('div.Hits_Wrapper__3q_7P').find('div.Paper_Paper__HIHv0').each((_i, elem) => {
    const image = $(elem).find('div.SearchCard_ProductCard_Image__ffKkn').toString().match(/(?<=src=")[^"]*/g)?.at(-1) as keyof Product;
    const title = $(elem).find('[data-testid="product-card::name"]').text();
    const price = $(elem).find('[data-testid="product-card::price"]').text().replace('R$ ', '');
    const link = `https://www.buscape.com.br${$(elem).find('a.SearchCard_ProductCard_Inner__7JhKb').attr('href')}` as keyof Product;
    
    productCards.push({ image, title, price, link });
  });

  return productCards;
}

async function scrapeMercadoLivre(category: UrlParams['category'], query: UrlParams['query']) {
  const response = await fetch(`${urls.mercadoLivre[category]}/${query}`);
  const page = await response.text();
  const $ = cheerio.load(page);

  const productCards: Product[] = []

  $('ol.ui-search-layout').find('li').each((_i, elem) => {
    const image = $(elem).find('img.ui-search-result-image__element').data('src') as keyof Product;
    const title = $(elem).find('h2.ui-search-item__title').text();
    const price = `${$(elem).find('div.ui-search-price__second-line').find('span.price-tag-fraction').eq(0).text()},00`;
    const link = $(elem).find('a.ui-search-link').attr('href') as keyof Product;

    productCards.push({ image, title, price, link });
  });

  return productCards;
}

export async function getProductsFromCategory(source: UrlParams['source'], category: UrlParams['category'], query: UrlParams['query']) {
  if (source === 'mercadoLivre') {
    return scrapeMercadoLivre(category, query);
  }
  if (source === 'buscape') {
    return scrapeBuscape(category, query);
  }
  const [ mercadoLivreProducts, buscapeProducts ] = await Promise.all([scrapeMercadoLivre(category, query), scrapeBuscape(category, query)]);
  return [...mercadoLivreProducts, ...buscapeProducts];
}