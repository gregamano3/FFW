import React, { useState } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { SpeciesCard } from './components/SpeciesCard';
import { useFilters } from './hooks/useFilters';
import { speciesData } from './data/species';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filters, setFilters, filteredData, availableOptions } = useFilters(speciesData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <FilterSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        filters={filters}
        onFilterChange={setFilters}
        availableOptions={availableOptions}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : ''}`}>
        <div className="px-6 py-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Flora & Fauna
                <span className="block text-2xl md:text-3xl font-normal text-teal-600 mt-2">
                  Encyclopedia
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive collection of plant and animal species from around the world. 
                Discover their unique characteristics, habitats, and conservation status.
              </p>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredData.length}</span> of{' '}
                <span className="font-semibold">{speciesData.length}</span> species
                {(filters.search || 
                  filters.type.length > 0 || 
                  filters.habitat.length > 0 || 
                  filters.family.length > 0 || 
                  filters.conservationStatus.length > 0 || 
                  filters.nativeStatus.length > 0) && ' (filtered)'}
              </p>
            </div>

            {/* Species Grid */}
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredData.map(species => (
                  <SpeciesCard key={species.id} species={species} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No species found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;