# Redux Integration for Labor Data

## Overview
The browseServices component now uses Redux store instead of local state for managing labor data fetched from the backend.

## Store Structure

### Labor Slice State
```typescript
interface Labor {
  team: Admin[];                    // Admin team members
  labors: LaborInterface[];         // Raw labor data
  laborTypes: LaborType[];          // Labor categories from backend
  laborCategories: LaborCategory[]; // Processed categories with UI data
  transformedLaborers: Laborer[];   // Processed laborers for UI
  isLoading: boolean;               // Loading state
  error: string | null;             // Error messages
}
```

## Actions Available

### Data Fetching
- `fetchLaborersWithTypes()` - Fetches labor types and laborers, processes and stores them
- `fetchLabors()` - Fetches raw labor data (legacy)
- `fetchTeam()` - Fetches admin team data

### State Management
- `setLaborTypes(types)` - Store labor types
- `setLaborCategories(categories)` - Store processed categories
- `setTransformedLaborers(laborers)` - Store processed laborers
- `setLoading(boolean)` - Set loading state
- `setError(message)` - Set error message
- `resetAll()` - Clear all labor data

## Selectors

```typescript
import { 
  selectLaborTypes,
  selectLaborCategories, 
  selectTransformedLaborers,
  selectLaborLoading,
  selectLaborError
} from "@/store/reducers";
```

## Usage in Components

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { fetchLaborersWithTypes, selectLaborCategories } from "@/store/reducers";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectLaborCategories);
  const isLoading = useAppSelector(selectLaborLoading);
  
  useEffect(() => {
    dispatch(fetchLaborersWithTypes());
  }, [dispatch]);
  
  // Component logic...
};
```

## Data Flow

1. Component dispatches `fetchLaborersWithTypes()`
2. Action fetches labor types and laborers from API
3. Action processes raw data:
   - Maps labor types to UI categories with icons/colors
   - Transforms backend laborer data to UI format
   - Calculates labor count per category
4. Processed data is stored in Redux state
5. Components access data via selectors
6. UI updates automatically when data changes

## Benefits

- **Centralized State**: All labor data in one place
- **Automatic Updates**: Components update when data changes
- **Caching**: Data persists across navigation
- **Error Handling**: Centralized error management
- **Loading States**: Consistent loading indicators
- **Type Safety**: Full TypeScript support
- **Reusability**: Multiple components can access same data

## Files Modified

- `/store/reducers/labor/laborSlice.ts` - Updated with new state structure
- `/store/reducers/labor/labor.actions.ts` - Added new actions and selectors
- `/store/reducers/index.ts` - Export new functions
- `/app/browseServices.tsx` - Converted to use Redux store
