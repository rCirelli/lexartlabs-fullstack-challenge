import * as cheerio from 'cheerio';

const urls = {
  mercadoLivre: {
    geladeira: 'https://lista.mercadolivre.com.br/eletrodomesticos/refrigeracao/geladeira/',
    tv: 'https://lista.mercadolivre.com.br/eletronicos-audio-video/televisores/',
    celular: 'https://lista.mercadolivre.com.br/celulares-telefones/celulares-smartphones/',
  },
  buscape: {
    geladeira: '',
    tv: '',
    celular: '',
  }
}

type Product = {
  image: string;
  title: string;
  price: string;
  link: string;
}

async function scrapeMercadoLivre(category: keyof typeof urls[keyof typeof urls], query: string) {
  const response = await fetch(urls.mercadoLivre[category]);
  const page = await response.text();
  const $ = cheerio.load(page);

  const productCards: Product[] = []

  $('ol.ui-search-layout').find('li').each((_i, elem) => {
    const image = $(elem).find('img.ui-search-result-image__element').data('src') as keyof Product;
    const title = $(elem).find('h2.ui-search-item__title').text();
    const price = $(elem).find('div.ui-search-price__second-line').find('span.price-tag-fraction').eq(0).text();
    const link = $(elem).find('a.ui-search-link').attr('href') as keyof Product;

    productCards.push({ image, title, price, link });
  });

  return productCards;
}

export async function getProductsFromCategory(source: keyof typeof urls, category: keyof typeof urls[keyof typeof urls], query: string) {
  if (source === 'mercadoLivre') {
    return scrapeMercadoLivre(category, query);
  }
}