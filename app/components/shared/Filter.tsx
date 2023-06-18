"use client";
import { filterNews } from "@/store/features/news/searchSlice";
import {
  addCategory,
  addCountry,
  addLanguage,
  addSortBy,
  addSource,
  getPreferences,
  removeCategory,
  removeCountry,
  removeLanguage,
  removeSortBy,
  removeSource,
  savePreferences,
} from "@/store/features/preference/preferenceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Multiselect from "multiselect-react-dropdown";
import { FormEvent, useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { data } from "./dummyFilter";

// import {data} from './dummyFilters.ts'

// =====================================================
// FILTERS  COMPONENT ==================================
// =====================================================
const Filter = () => {
  const [showModal, setShowModal] = useState(false);

  const { loggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // get saved preferences on page load
  useEffect(
    () => {
      if (loggedIn) dispatch(getPreferences());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loggedIn]
  );

  // handle filter
  const handleFilters = () => {
    setShowModal(!showModal);
  };

  // RETURN ==========================================
  return (
    <div className="relative">
      <button onClick={handleFilters} className="flex gap-2 items-center">
        <HiOutlineAdjustmentsHorizontal />
        <span>Filters & Preferences</span>
      </button>
      {/* modal */}
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
};

// EXTENDED COMPONENT =================================
type Filter = { title: string; key: string };

const Modal = ({ setShowModal }: { setShowModal: (arg0: boolean) => void }) => {
  // redux
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.news);

  // state
  const {
    sources,
    categories,
    languages,
    countries,
    sortBy,
    loading,
    error,
    saved,
  } = useAppSelector(state => state.preference);

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const preference = {
      sources: JSON.stringify(sources),
      categories: JSON.stringify(categories),
      languages: JSON.stringify(languages),
      countries: JSON.stringify(countries),
      sortBy: JSON.stringify(sortBy),
    };

    let filter = "";
    if (sources.length > 0) {
      filter = `sources=${sources.map(source => source.key).join(",")}&`;
    }
    if (categories.length > 0) {
      filter += `category=${categories
        .map(category => category.key)
        .join(",")}&`;
    }
    if (languages.length > 0) {
      filter += `language=${languages
        .map(language => language.key)
        .join(",")}&`;
    }
    if (countries.length > 0) {
      filter += `country=${countries.map(country => country.key).join(",")}&`;
    }
    if (sortBy.length > 0) {
      filter += `sortBy=${sortBy.map(sort => sort.key).join(",")}&`;
    }

    filter = filter.slice(0, -1);

    dispatch(filterNews({ query, filter }));

    dispatch(savePreferences(preference));

    if (saved) setShowModal(false);
  };

  // RETURN ==========================================
  return (
    <div className="absolute shadow-lg top-8 left-0 md:left-4">
      <form className="bg-white space-y-4 p-6 rounded">
        {/* sources */}
        <div className="">
          <h1>Sources</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addSource(e))}
              onRemove={e => dispatch(removeSource(e))}
              options={data.sources}
              selectedValues={sources}
            />
          </div>
        </div>
        {/* categories */}
        <div className="">
          <h1>Categories</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addCategory(e))}
              onRemove={e => dispatch(removeCategory(e))}
              options={data.categories}
              selectedValues={categories}
            />
          </div>
        </div>
        {/* languages */}
        <div className="">
          <h1>Languages</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addLanguage(e))}
              onRemove={e => dispatch(removeLanguage(e))}
              options={data.languages}
              selectedValues={languages}
            />
          </div>
        </div>
        {/* countries */}
        <div className="">
          <h1>Countries</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addCountry(e))}
              onRemove={e => dispatch(removeCountry(e))}
              options={data.countries}
              selectedValues={countries}
            />
          </div>
        </div>
        {/* sortBy */}
        <div className="">
          <h1>SortBy</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addSortBy(e))}
              onRemove={e => dispatch(removeSortBy(e))}
              options={data.sortBy}
              selectedValues={sortBy}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4 pt-4">
          <button
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </button>
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : error ? error : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
