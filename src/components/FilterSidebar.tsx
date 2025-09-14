import React from 'react';
import { Search, ChevronDown, ChevronUp, X, Menu } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableOptions: {
    types: string[];
    habitats: string[];
    families: string[];
    conservationStatuses: string[];
    nativeStatuses: string[];
    ecologies: string[];
    distributions: string[];
    threats: string[];
    uses: string[];
    morphologies: string[];
    flowerings: string[];
    fruitings: string[];
    behaviors: string[];
    diets: string[];
  };
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onOptionsChange: (options: string[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedOptions,
  onOptionsChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(title === 'Species Type');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onOptionsChange(selectedOptions.filter(o => o !== option));
    } else {
      onOptionsChange([...selectedOptions, option]);
    }
  };

  if (options.length === 0) return null;

  return (
    <div className="border-b border-teal-200 pb-4 mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-teal-700 transition-colors"
      >
        <span className="uppercase text-sm tracking-wide">{title}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {/* Search within category */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          {/* Options list */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-teal-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionToggle(option)}
                    className="form-checkbox h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-600">{option}</span>
                </label>
              ))
            ) : (
              <div className="text-xs text-gray-400 italic py-2">
                No {title.toLowerCase()} found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onToggle,
  filters,
  onFilterChange,
  availableOptions,
}) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 left-6 z-50 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg shadow-lg transition-all duration-300 ${
          isOpen ? 'transform translate-x-80' : ''
        }`}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-teal-600 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
              <div className="text-sm font-medium mt-1">
                BROWSE BY SPECIES TYPE<br />CATEGORIES
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search Within Collections"
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
            </div>
          </div>

          {/* Filter Sections */}
          <FilterSection
            title="Flora & Fauna"
            options={availableOptions.types}
            selectedOptions={filters.type}
            onOptionsChange={(options) => onFilterChange({ ...filters, type: options })}
          />

          <FilterSection
            title="Native Status"
            options={availableOptions.nativeStatuses}
            selectedOptions={filters.nativeStatus}
            onOptionsChange={(options) => onFilterChange({ ...filters, nativeStatus: options })}
          />

          <FilterSection
            title="Habitat"
            options={availableOptions.habitats}
            selectedOptions={filters.habitat}
            onOptionsChange={(options) => onFilterChange({ ...filters, habitat: options })}
          />

          <FilterSection
            title="Ecology"
            options={availableOptions.ecologies}
            selectedOptions={filters.ecology}
            onOptionsChange={(options) => onFilterChange({ ...filters, ecology: options })}
          />

          <FilterSection
            title="Conservation Status"
            options={availableOptions.conservationStatuses}
            selectedOptions={filters.conservationStatus}
            onOptionsChange={(options) => onFilterChange({ ...filters, conservationStatus: options })}
          />

          <FilterSection
            title="Distribution"
            options={availableOptions.distributions}
            selectedOptions={filters.distribution}
            onOptionsChange={(options) => onFilterChange({ ...filters, distribution: options })}
          />

          <FilterSection
            title="Family"
            options={availableOptions.families}
            selectedOptions={filters.family}
            onOptionsChange={(options) => onFilterChange({ ...filters, family: options })}
          />

          <FilterSection
            title="Threats"
            options={availableOptions.threats}
            selectedOptions={filters.threats}
            onOptionsChange={(options) => onFilterChange({ ...filters, threats: options })}
          />

          <FilterSection
            title="Uses"
            options={availableOptions.uses}
            selectedOptions={filters.uses}
            onOptionsChange={(options) => onFilterChange({ ...filters, uses: options })}
          />

          <FilterSection
            title="Morphology"
            options={availableOptions.morphologies}
            selectedOptions={filters.morphology}
            onOptionsChange={(options) => onFilterChange({ ...filters, morphology: options })}
          />

          <FilterSection
            title="Flowering Period"
            options={availableOptions.flowerings}
            selectedOptions={filters.flowering}
            onOptionsChange={(options) => onFilterChange({ ...filters, flowering: options })}
          />

          <FilterSection
            title="Fruiting Period"
            options={availableOptions.fruitings}
            selectedOptions={filters.fruiting}
            onOptionsChange={(options) => onFilterChange({ ...filters, fruiting: options })}
          />

          <FilterSection
            title="Behavior"
            options={availableOptions.behaviors}
            selectedOptions={filters.behavior}
            onOptionsChange={(options) => onFilterChange({ ...filters, behavior: options })}
          />

          <FilterSection
            title="Diet"
            options={availableOptions.diets}
            selectedOptions={filters.diet}
            onOptionsChange={(options) => onFilterChange({ ...filters, diet: options })}
          />
        </div>
      </div>
    </>
  );
};