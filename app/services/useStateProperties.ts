import { reactive, computed } from 'vue';
import { featuredProperties } from '~/lib/data';

const filters = reactive({
  location: '',
  type: 'all' as string,
  price: 'all' as string,
});

/** Route ke halaman search dengan query params dari filter */
const searchRoute = computed(() => {
  const query: Record<string, string> = {};
  if (filters.location.trim()) query.location = filters.location.trim();
  if (filters.type && filters.type !== 'all') query.type = filters.type;
  if (filters.price && filters.price !== 'all') query.price = filters.price;
  return { path: '/search', query };
});

/** Properti yang difilter berdasarkan state filters */
const filteredProperties = computed(() => {
  const location = filters.location.trim().toLowerCase();
  const type = filters.type;
  const price = filters.price;

  return featuredProperties.filter((p) => {
    if (location) {
      const matchLocation =
        p.location.toLowerCase().includes(location) ||
        p.title.toLowerCase().includes(location);
      if (!matchLocation) return false;
    }
    if (type && type !== 'all' && p.type !== type) return false;
    if (price && price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      if (p.priceValue < min || p.priceValue > max) return false;
    }
    return true;
  });
});

/** Sinkronkan filters dari query URL (dipanggil dari halaman search) */
function syncFiltersFromRoute(query: Record<string, unknown>) {
  const v = (key: string) => {
    const val = query[key];
    return Array.isArray(val) ? val[0] : val;
  };
  filters.location = (v('location') as string) ?? '';
  filters.type = (v('type') as string) ?? 'all';
  filters.price = (v('price') as string) ?? 'all';
}

function scrollToFilter() {
  document.querySelector('#filter-search')?.scrollIntoView({ behavior: 'smooth' });
}

export function useStateProperties() {
  return {
    filters,
    searchRoute,
    filteredProperties,
    syncFiltersFromRoute,
    scrollToFilter,
  };
}
