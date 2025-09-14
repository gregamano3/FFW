import { useState, useMemo } from 'react';
import { Species, FilterState } from '../types';

export const useFilters = (data: Species[]) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: [],
    habitat: [],
    family: [],
    conservationStatus: [],
    nativeStatus: [],
    ecology: [],
    distribution: [],
    threats: [],
    uses: [],
    morphology: [],
    flowering: [],
    fruiting: [],
    behavior: [],
    diet: [],
  });

  const availableOptions = useMemo(() => {
    return {
      types: Array.from(new Set(data.map(item => item.type.charAt(0).toUpperCase() + item.type.slice(1)))).sort(),
      habitats: Array.from(new Set(data.map(item => item.habitat))).sort(),
      families: Array.from(new Set(data.map(item => item.family))).sort(),
      conservationStatuses: Array.from(new Set(data.map(item => item.conservationStatus))).sort(),
      nativeStatuses: Array.from(new Set(data.map(item => item.nativeStatus))).sort(),
      ecologies: Array.from(new Set(data.map(item => item.ecology).filter(Boolean))).sort(),
      distributions: Array.from(new Set(data.map(item => item.distribution).filter(Boolean))).sort(),
      threats: Array.from(new Set(data.map(item => item.threats).filter(Boolean))).sort(),
      uses: Array.from(new Set(data.map(item => item.uses).filter(Boolean))).sort(),
      morphologies: Array.from(new Set(data.map(item => item.morphology).filter(Boolean))).sort(),
      flowerings: Array.from(new Set(data.map(item => item.flowering).filter(Boolean))).sort(),
      fruitings: Array.from(new Set(data.map(item => item.fruiting).filter(Boolean))).sort(),
      behaviors: Array.from(new Set(data.map(item => item.behavior).filter(Boolean))).sort(),
      diets: Array.from(new Set(data.map(item => item.diet).filter(Boolean))).sort(),
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          item.name.toLowerCase().includes(searchTerm) ||
          item.scientificName.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.ecology.toLowerCase().includes(searchTerm) ||
          item.distribution.toLowerCase().includes(searchTerm) ||
          item.threats.toLowerCase().includes(searchTerm) ||
          item.uses.toLowerCase().includes(searchTerm) ||
          item.morphology.toLowerCase().includes(searchTerm) ||
          item.flowering.toLowerCase().includes(searchTerm) ||
          item.fruiting.toLowerCase().includes(searchTerm) ||
          item.behavior.toLowerCase().includes(searchTerm) ||
          item.diet.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(item.type.charAt(0).toUpperCase() + item.type.slice(1))) {
        return false;
      }

      // Habitat filter
      if (filters.habitat.length > 0 && !filters.habitat.includes(item.habitat)) {
        return false;
      }

      // Family filter
      if (filters.family.length > 0 && !filters.family.includes(item.family)) {
        return false;
      }

      // Conservation status filter
      if (filters.conservationStatus.length > 0 && !filters.conservationStatus.includes(item.conservationStatus)) {
        return false;
      }

      // Native status filter
      if (filters.nativeStatus.length > 0 && !filters.nativeStatus.includes(item.nativeStatus)) {
        return false;
      }

      // Ecology filter
      if (filters.ecology.length > 0 && !filters.ecology.includes(item.ecology)) {
        return false;
      }

      // Distribution filter
      if (filters.distribution.length > 0 && !filters.distribution.includes(item.distribution)) {
        return false;
      }

      // Threats filter
      if (filters.threats.length > 0 && !filters.threats.includes(item.threats)) {
        return false;
      }

      // Uses filter
      if (filters.uses.length > 0 && !filters.uses.includes(item.uses)) {
        return false;
      }

      // Morphology filter
      if (filters.morphology.length > 0 && !filters.morphology.includes(item.morphology)) {
        return false;
      }

      // Flowering filter
      if (filters.flowering.length > 0 && !filters.flowering.includes(item.flowering)) {
        return false;
      }

      // Fruiting filter
      if (filters.fruiting.length > 0 && !filters.fruiting.includes(item.fruiting)) {
        return false;
      }

      // Behavior filter
      if (filters.behavior.length > 0 && !filters.behavior.includes(item.behavior)) {
        return false;
      }

      // Diet filter
      if (filters.diet.length > 0 && !filters.diet.includes(item.diet)) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  return {
    filters,
    setFilters,
    filteredData,
    availableOptions,
  };
};