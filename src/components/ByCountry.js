import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { default as searchSvg } from '../svgs/searchSvg.svg';
import { default as upArrowSvg } from '../svgs/upArrowSvg.svg';
import { default as downArrowSvg } from '../svgs/downArrowSvg.svg';

function ByCountry({ countries }) {
  const { t } = useTranslation();
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [sortDirection, setSortDirection] = useState('ascending');
  const [prevTerm, setPrevTerm] = useState('');

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearch = (e) => {
    const filtered = countries.filter((country) => {
      return country.name.en
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setFilteredCountries(filtered);
  };

  const handleSort = (e) => {
    const term = e.currentTarget.value;
    const copy = [...filteredCountries];

    let direction = 'ascending';
    if (term === prevTerm && sortDirection === 'ascending') {
      direction = 'descending';
    }
    setSortDirection(direction);

    setPrevTerm(term);

    if (term === 'name') {
      const sortedCountries = copy.sort((a, b) => {
        if (sortDirection === 'ascending') {
          return b.name.en < a.name.en ? 1 : a.name.en < b.name.en ? -1 : 0;
        } else {
          return b.name.en > a.name.en ? 1 : a.name.en > b.name.en ? -1 : 0;
        }
      });
      setFilteredCountries(sortedCountries);
    } else {
      const sortedCountries = copy.sort((a, b) => {
        return sortDirection === 'ascending'
          ? b[term] - a[term]
          : a[term] - b[term];
      });
      setFilteredCountries(sortedCountries);
    }
  };

  return (
    <div className='flex flex-col byCountry'>
      <div className='relative w-fit md:my-10 lg:mt-0 lg:mb-10'>
        <input
          type='search'
          className='relative w-64 px-4 py-4 font-semibold border-gray-300 rounded-md pl-14 md:border md:py-3 focus:outline-none text-lg'
          placeholder={t('Search by country')}
          onChange={handleSearch}
        />
        <img
          src={searchSvg}
          alt='search icon'
          className='w-6 absolute top-4 left-4'
        />
      </div>
      <div className='overflow-x-auto'>
        <div className='inline-block py-2 m-auto align-middle w-full'>
          <div className='m-auto border-b border-gray-200 md:shadow lg:overflow-x-hidden sm:rounded-lg x-scroller sm:width90'>
            <table className='w-full divide-y divide-gray-200 shadow content'>
              <thead className='bg-gray-100 h-14'>
                <tr>
                  <th
                    scope='col'
                    className='px-3 py-3 text-xs font-extrabold tracking-wider text-left md:px-8 md:w-1/5 md:m-32 sticky-header'
                  >
                    <button
                      className='flex items-center w-26 font-bold'
                      value='name'
                      onClick={handleSort}
                    >
                      <p className='inline-block'>{t('Location')}</p>
                      <div className='flex flex-col ml-2 justify-between h-4 my-auto min-w-fit'>
                        <img src={upArrowSvg} alt='up arrow for sorting' />
                        <img src={downArrowSvg} alt='down arrow for sorting' />
                      </div>
                    </button>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3 text-xs font-extrabold tracking-wider text-left md:px-8 md:w-1/5 md:m-32 sticky-header'
                  >
                    <button
                      className='flex items-center font-bold'
                      value='confirmed'
                      onClick={handleSort}
                    >
                      <p className='inline-block'>{t('New Cases')}</p>
                      <div className='flex flex-col ml-2 justify-between h-4 my-auto min-w-fit'>
                        <img src={upArrowSvg} alt='up arrow for sorting' />
                        <img src={downArrowSvg} alt='down arrow for sorting' />
                      </div>
                    </button>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3 text-xs font-extrabold tracking-wider text-left md:px-8 md:w-1/5 md:m-32 sticky-header '
                  >
                    <button
                      className='flex items-center font-bold'
                      value='deaths'
                      onClick={handleSort}
                    >
                      <p className='inline-block'>{t('Deaths')}</p>
                      <div className='flex flex-col ml-2 justify-between h-4 my-auto min-w-fit'>
                        <img src={upArrowSvg} alt='up arrow for sorting' />
                        <img src={downArrowSvg} alt='down arrow for sorting' />
                      </div>
                    </button>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3 text-xs font-extrabold tracking-wider text-left md:px-8 md:w-1/5 md:m-32 sticky-header'
                  >
                    <button
                      className='flex items-center font-bold'
                      value='recovered'
                      onClick={handleSort}
                    >
                      <p className='inline-block'>{t('Recovered')}</p>
                      <div className='flex flex-col ml-2 justify-between h-4 my-auto  min-w-fit'>
                        <img src={upArrowSvg} alt='up arrow for sorting' />
                        <img src={downArrowSvg} alt='down arrow for sorting' />
                      </div>
                    </button>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3 text-xs font-extrabold tracking-wider text-left md:px-8 md:w-1/5 md:m-32 sticky-header '
                  >
                    <button
                      className='flex items-center font-bold'
                      value='critical'
                      onClick={handleSort}
                    >
                      <p className='inline-block'>{t('Critical')}</p>
                      <div className='flex flex-col ml-2 justify-between h-4 my-auto min-w-fit'>
                        <img src={upArrowSvg} alt='up arrow for sorting' />
                        <img src={downArrowSvg} alt='down arrow for sorting' />
                      </div>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {filteredCountries?.map((country) => {
                  return (
                    <tr
                      className='bg-white font-normal'
                      key={country.countryCode}
                    >
                      <td className='px-3 md:px-8 py-4 text-sm  text-gray-900 break all'>
                        <p className='w-24 break-words'>{country.name.en}</p>
                      </td>
                      <td className='px-3 md:px-8 py-4 text-sm  text-gray-900 break all'>
                        <p className='w-24 break-words'>{country.confirmed}</p>
                      </td>
                      <td className='px-3 md:px-8 py-4 text-sm  text-gray-900 break all'>
                        <p className='w-24 break-words'>{country.deaths}</p>
                      </td>
                      <td className='px-3 md:px-8 py-4 text-sm  text-gray-900 break all'>
                        <p className='w-24 break-words'>{country.recovered}</p>
                      </td>
                      <td className='px-3 md:px-8 py-4 text-sm  text-gray-900 break all'>
                        <p className='w-24 break-words'>{country.critical}</p>
                      </td>
                    </tr>
                  );
                })}

                {!countries && (
                  <tr className='bg-white'>
                    <td colSpan='5'>
                      <div className='flex items-center justify-center p-8 py-32'>
                        <p className='text-2xl font-bold opacity-70'>
                          No countries were found...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ByCountry;
