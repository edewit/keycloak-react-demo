import React from 'react';
import { FruitLoader } from './ListLoader';
import { Fruit } from './types';
import { DataList, DataListItem, DataListItemRow, DataListItemCells, DataListCell, Title } from '@patternfly/react-core';

export default function FruitList() {
  return (
    <div>
      <Title headingLevel="h1" size="lg">Fruit List</Title>
      <FruitLoader>
        {(fetchedFruits: Fruit[]) => (
          <FruitDataList fetchedFruits={fetchedFruits} />
        )}
      </FruitLoader>
    </div>
  );
}

export function FruitDataList(props: any) {
  return (<DataList aria-label="Fruits">
    <DataListItem aria-labelledby="header" style={{ fontWeight: 'bolder' }}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={[
            <DataListCell key="name">Name</DataListCell>,
            <DataListCell key="desciption">Description</DataListCell>
          ]}
        />
      </DataListItemRow>
    </DataListItem>

    {
      props.fetchedFruits.map((fruit: Fruit, i: number) => {
        return (
          <DataListItem aria-labelledby={fruit.name} key={i}>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key={i + 'name'}>{fruit.name}</DataListCell>,
                  <DataListCell key={i + 'desciption'}>{fruit.description}</DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        );
      })}
  </DataList>)
}