/* eslint-disable strict */
'use strict';

import { Fragment } from 'react';
import { VisibleIfRegex } from '../../../helper';
import { useFormContext } from 'react-hook-form';
import { renderElement } from '../../../helper/renderer';

const Panel = ({ element }) => {
  const { watch } = useFormContext();

  const visibleIfMatch = element?.visibleIf?.match(VisibleIfRegex);
  if (!element?.visibleIf || (visibleIfMatch && watch(visibleIfMatch[1]) === visibleIfMatch[2]))
    return (
      <div className="w-full bg-white border border-solid border-gray-500 rounded-md">
        {element.title && (
          <div className="w-full border-b border-solid border-gray-500">
            <p className="p-4">{element.title}</p>
          </div>
        )}
        <div className="w-full p-4 flex flex-row flex-wrap items-end gap-3">
          {element?.elements?.map(detail => (
            <Fragment key={detail.name}>{renderElement(detail)}</Fragment>
          ))}
        </div>
      </div>
    );
};

export default Panel;
