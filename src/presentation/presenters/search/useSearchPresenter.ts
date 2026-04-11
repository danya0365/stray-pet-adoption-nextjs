"use client";

import { useState, useCallback, useEffect } from "react";
import { SearchViewModel, SearchFilters, SearchPresenter } from "./SearchPresenter";
import { createClientSearchPresenter } from "./SearchPresenterClientFactory";
import { SelectedLocation } from "../../shared/LocationPickerModal";

/**
 * Custom hook for Search presenter
 * Handles search state, filters, and interaction with the LocationPicker
 */
export function useSearchPresenter(initialViewModel?: SearchViewModel) {
  const [presenter] = useState(() => createClientSearchPresenter());
  
  const [filters, setFilters] = useState<SearchFilters>(
    initialViewModel?.filters ?? {
      query: '',
      type: 'All',
      breed: 'All',
      gender: 'All',
      age: 'All',
      radius: 50,
    }
  );

  const [viewModel, setViewModel] = useState<SearchViewModel | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (currentFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const vm = await presenter.search(currentFilters);
      setViewModel(vm);
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [presenter]);

  const updateFilter = useCallback((newFields: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFields };
    setFilters(updated);
    handleSearch(updated);
  }, [filters, handleSearch]);

  const handleLocationConfirm = useCallback((location: SelectedLocation) => {
    updateFilter({
      latitude: location.latitude,
      longitude: location.longitude
    });
  }, [updateFilter]);

  return {
    viewModel,
    filters,
    loading,
    error,
    updateFilter,
    handleLocationConfirm,
    refresh: () => handleSearch(filters)
  };
}
