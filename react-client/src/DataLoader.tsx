import React, { useState, useEffect } from 'react';
import { Spinner } from '@patternfly/react-core';
import style from './DataLoader.module.scss';

export function DataLoader<T>(props: { loader: () => Promise<T>, deps?: any[], children: ((arg: T) => any) | React.ReactNode }) {
  const [data, setData] = useState<{ result: T } | undefined>(undefined);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    setData(undefined);
    const loadData = async () => {
      try {
        const result = await props.loader();
        setData({ result });
      } catch (e) {
        setError(e);
      }
    };

    loadData();
  }, [props]);
  if (!!data) {
    if (props.children instanceof Function) {
      return props.children(data.result);
    }
    return props.children;
  }
  return (<Loader error={error} aria-label="Loading data" />);
}

export function Loader(props: { 'aria-label'?: string; error?: any; }) {
  return (
    <div className={style.loader} aria-label={props['aria-label']}>
      {!props || (!props.error && (
        <div className="center">
          <Spinner/>
        </div>
      ))}
      {props && props.error &&
        <div className="cards">
          <div className="card">
            <h5 className="card-header">Error</h5>
            <p className="card-body">{props.error}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default DataLoader;