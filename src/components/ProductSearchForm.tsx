'use client';
import { ChangeEvent } from 'react';
import Dropdown from '@/components/Dropdown'; 
import { formAtom, FormState, shouldFetchAtom } from '@/store';
import { useAtom, useSetAtom } from 'jotai';
import FormInitializer from './FormInitializer';

function ProductSearchForm() {
  const sourceOptions = ['all', 'mercadoLivre', 'buscape']
  const sourceOptionNames = ['Todas', 'Mercado Livre', 'Buscapé']
  const categoryOptions = ['Geladeira', 'TV', 'Celular']

  const setShouldFetch = useSetAtom(shouldFetchAtom);
  const [formValues, setFormValues] = useAtom(formAtom);

  const handleChange = (field: keyof FormState) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [field]: e.target.value });
    };
  };

  return (
    <div className="w-3/5 flex justify-center gap-4">
      <FormInitializer source={sourceOptions[0]} category={categoryOptions[0]} query={''} />
      <Dropdown
        inputName="Fonte"
        options={sourceOptions}
        optionNames={sourceOptionNames}
        handler={handleChange('source')}
        value={formValues.source}
      />
      <Dropdown
        inputName="Categorias"
        options={categoryOptions}
        handler={handleChange('category')}
        value={formValues.category}
      />
      <input
        className="flex-grow"
        type="search"
        onChange={handleChange('query')}
        value={formValues.query}
      />
      <button onClick={() => setShouldFetch(true)}>Buscar</button>
    </div>
  );
}

export default ProductSearchForm;
