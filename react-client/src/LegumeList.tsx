import React from 'react';
import { LegumeLoader } from './ListLoader';
import { Legume } from './types';
import { Title } from '@patternfly/react-core';
import { FruitDataList } from './FruitList';

export default function LegumeList() {
  return (
    <div>
      <Title headingLevel="h1" size="lg">Legumes List</Title>
      <LegumeLoader>
        {(legumes: Legume[]) => (
          <FruitDataList fetchedFruits={legumes} />
        )}
      </LegumeLoader>
    </div>
  );
}