/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'carbon-components-react';
import ProgressBar from '../ProgressBar';

import { renderTable } from './utils';

export const Keywords = ({ language, result }) => {
  if (!result || result.length === 0) {
    return <p>{`No Keywords returned for the input in language: ${language}.`}</p>;
  }

  const headers = [
    {
      header: 'Text',
      key: 'text',
    },
    {
      header: 'Relevance',
      key: 'relevance',
    },
  ];

  const rows = result.map((keyword, i) => ({ ...keyword, id: `${i}` }));

  const renderCell = cell => {
    return (
      <DataTable.TableCell key={cell.id}>
        {cell.info.header === 'relevance' ? (
          <ProgressBar progress={cell.value} />
        ) : (
          cell.value
        )}
      </DataTable.TableCell>
    );
  };

  return (
    <DataTable
      sortRow={(a, b) => a < b}
      rows={rows}
      headers={headers}
      render={renderTable(renderCell)}
    />
  );
};

Keywords.propTypes = {
  result: PropTypes.array,
  language: PropTypes.string,
};

Keywords.defaultProps = {
  result: [],
  language: 'en',
};

export default Keywords;
