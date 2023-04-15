'use client';
import { ChangeEvent, useState } from 'react';
import Dropdown from '@/components/Dropdown';

function ProductSearchForm() {
  const sourceOptions = ['Todas', 'Mercado Livre', 'Buscapé']
  const categoryOptions = ['Geladeira', 'TV', 'Celular']

  const [formValues, setFormValues] = useState({
    source: sourceOptions[0],
    category: categoryOptions[0],
    search: '',
  });

  const handleChange = (field: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  return (
    <div className="w-3/5 flex justify-center gap-4">
      <Dropdown
        inputName="Fonte"
        options={sourceOptions}
        handler={handleChange('source')}
      />
      <Dropdown
        inputName="Categorias"
        options={categoryOptions}
        handler={handleChange('category')}
      />
      <input
        className="flex-grow"
        type="search"
        onChange={handleChange('search')}
        value={formValues.search}
      />
      <button>Search</button>
    </div>
  );
}

export default ProductSearchForm;
