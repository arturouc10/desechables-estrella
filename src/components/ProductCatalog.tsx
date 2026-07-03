'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { siteConfig } from '@/lib/config';
import type { Product } from '@/types';

interface ProductCatalogProps {
  products: Product[];
  categories: { id: string; name: string; slug: string; section: string; aliases?: string[] }[];
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Search Query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    // Filter by Category
    if (selectedCategories.length > 0) {
      // Get the full category objects to check against name and aliases
      const selectedCatsFull = categories.filter(c => selectedCategories.includes(c.slug));
        
      result = result.filter((p) => {
        const pCat = (p.category || '').toLowerCase();
        
        return selectedCatsFull.some(c => {
          // Exact slug match
          if (c.slug === p.category) return true;
          // Name match
          const cName = c.name.toLowerCase();
          if (cName === pCat || pCat.includes(cName) || cName.includes(pCat)) return true;
          // Alias match
          if (c.aliases && c.aliases.some(alias => pCat.includes(alias.toLowerCase()))) return true;
          
          return false;
        });
      });
    }

    // Filter by Min Price
    if (minPrice !== '') {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        result = result.filter((p) => p.price && p.price >= min);
      }
    }

    // Filter by Max Price
    if (maxPrice !== '') {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price && p.price <= max);
      }
    }

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [products, selectedCategories, minPrice, maxPrice, sortBy, query]);

  return (
    <div className="catalog-container">
      {/* Mobile filter toggle */}
      <div className="mobile-filter-bar">
        <button 
          className="btn-filter-toggle"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros 🔍'}
        </button>
        <span className="results-count">{filteredProducts.length} productos</span>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className={`catalog-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="filter-group">
            <h3>Categorías</h3>
            <div className="filter-options">
              {Array.from(new Set(categories.map(c => c.section))).map(section => (
                <div key={section} className="filter-section">
                  <h4 className="filter-section-title">{section}</h4>
                  {categories.filter(c => c.section === section).map((cat) => (
                    <label key={cat.id} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {siteConfig.isEcommerceEnabled && (
            <div className="filter-group">
              <h3>Precio</h3>
              <div className="price-inputs">
                <div className="input-wrap">
                  <span>$</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                </div>
                <span className="separator">-</span>
                <div className="input-wrap">
                  <span>$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="filter-group">
            <h3>Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="sort-select"
            >
              <option value="default">Relevancia</option>
              {siteConfig.isEcommerceEnabled && (
                <>
                  <option value="price_asc">Menor precio</option>
                  <option value="price_desc">Mayor precio</option>
                </>
              )}
            </select>
          </div>
          
          {(selectedCategories.length > 0 || minPrice !== '' || maxPrice !== '' || sortBy !== 'default') && (
            <button 
              className="btn-clear-filters"
              onClick={() => {
                setSelectedCategories([]);
                setMinPrice('');
                setMaxPrice('');
                setSortBy('default');
              }}
            >
              Limpiar filtros
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <main className="catalog-main">
          <div className="desktop-results-bar">
            <h2>Catálogo</h2>
            <span className="results-count">{filteredProducts.length} productos encontrados</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
              <button 
                className="btn-clear-filters"
                onClick={() => {
                  setSelectedCategories([]);
                  setMinPrice('');
                  setMaxPrice('');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
