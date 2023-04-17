'use client';
import { ChangeEvent } from 'react';
import { shallow } from 'zustand/shallow';
import Dropdown from '@/components/Dropdown'; 
import { State, useFetchStore, useStore } from '@/store';
import StoreInitializer from './StoreInitializer';

function ProductSearchForm() {
  const sourceOptions = ['all', 'mercadoLivre', 'buscape']
  const sourceOptionNames = ['Todas', 'Mercado Livre', 'Buscapé']
  const categoryOptions = ['Geladeira', 'TV', 'Celular']

  // const [formValues, setFormValues] = useState({
  //   source: sourceOptions[0],
  //   category: categoryOptions[0],
  //   query: '',
  // });

  const toggleShouldFetch = useFetchStore((state) => state.toggleShouldFetch);
  const { source, category, query, setState } = useStore((state) => ({
      source: state.source,
      category: state.category,
      query: state.query,
      setState: state.setState,
      // toggleShouldFetch: state.toggleShouldFetch,
    }),
    shallow
  );

  const handleChange = (field: keyof State) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setState(field, e.target.value);
    };
  };

  return (
    <div className="w-3/5 flex justify-center gap-4">
      <StoreInitializer source={sourceOptions[0]} category={categoryOptions[0]} query={''} />
      <Dropdown
        inputName="Fonte"
        options={sourceOptions}
        optionNames={sourceOptionNames}
        handler={handleChange('source')}
        value={source}
      />
      <Dropdown
        inputName="Categorias"
        options={categoryOptions}
        handler={handleChange('category')}
        value={category}
      />
      <input
        className="flex-grow"
        type="search"
        onChange={handleChange('query')}
        value={query}
      />
      <button onClick={toggleShouldFetch}>Search</button>
    </div>
  );
}

export default ProductSearchForm;
