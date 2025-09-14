export interface Species {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  type: 'flora' | 'fauna';
  habitat: string;
  family: string;
  conservationStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Data Deficient' | 'Not Evaluated';
  nativeStatus: 'Native' | 'Non-native' | 'Naturalised' | 'Cultivated';
  ecology: string;
  distribution: string;
  threats: string;
  uses: string;
  morphology: string;
  flowering: string; // For flora
  fruiting: string; // For flora
  behavior: string; // For fauna
  diet: string; // For fauna
}

export interface FilterState {
  search: string;
  type: string[];
  habitat: string[];
  family: string[];
  conservationStatus: string[];
  nativeStatus: string[];
  ecology: string[];
  distribution: string[];
  threats: string[];
  uses: string[];
  morphology: string[];
  flowering: string[];
  fruiting: string[];
  behavior: string[];
  diet: string[];
}