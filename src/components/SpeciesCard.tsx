import React from 'react';
import { Species } from '../types';

interface SpeciesCardProps {
  species: Species;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Least Concern':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Near Threatened':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Vulnerable':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Endangered':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Critically Endangered':
        return 'bg-red-200 text-red-900 border-red-300';
      case 'Data Deficient':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Not Evaluated':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNativeStatusColor = (status: string) => {
    switch (status) {
      case 'Native':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Non-native':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Naturalised':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cultivated':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              species.conservationStatus
            )}`}
          >
            {species.conservationStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getNativeStatusColor(
              species.nativeStatus
            )}`}
          >
            {species.nativeStatus}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">
            {species.type === 'flora' ? '🌿 Flora' : '🐾 Fauna'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
            {species.name}
          </h3>
          <p className="text-sm font-medium text-teal-600 italic mb-3">
            {species.scientificName}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
              {species.family}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
              {species.habitat}
            </span>
            {species.ecology && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                {species.ecology}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {species.description}
        </p>

        {/* Additional Details */}
        <div className="space-y-2 text-xs text-gray-500">
          {species.distribution && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2 min-w-0 flex-shrink-0">Distribution:</span>
              <span>{species.distribution}</span>
            </div>
          )}
          {species.type === 'flora' && species.flowering && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2 min-w-0 flex-shrink-0">Flowering:</span>
              <span>{species.flowering}</span>
            </div>
          )}
          {species.type === 'fauna' && species.diet && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2 min-w-0 flex-shrink-0">Diet:</span>
              <span>{species.diet}</span>
            </div>
          )}
          {species.threats && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-2 min-w-0 flex-shrink-0">Threats:</span>
              <span>{species.threats}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};