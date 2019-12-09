import * as React from 'react';
import { render } from '@testing-library/react';
import { KeycloakInstance } from 'keycloak-js';
import { FruitLoader } from '../ListLoader';
import { Fruit } from '../types';
import { KeycloakContext } from '../KeycloakContext';

describe('<FruitLoader />', () => {
  it('should return corresponding list of fruit', async (done) => {
    const mockSuccessResponse = [
      { name: 'dummy', descption: 'yummy' }
    ];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global as any, 'fetch').mockImplementation(() => mockFetchPromise);
    const KeycloakMock = jest.fn<KeycloakInstance<'native'>>(() => {});
    const keycloak = new KeycloakMock();

    const comp = render(
      <KeycloakContext.Provider value={keycloak}>
        <FruitLoader>
          {(fetchedFruits: Fruit[]) => (
            (<h1>Fruit has been loaded {fetchedFruits.length}</h1>)
          )}
        </FruitLoader>
      </KeycloakContext.Provider>
    );

    await comp.findByText('Fruit has been loaded 1');
    expect((global as any).fetch).toHaveBeenCalledTimes(1);

    process.nextTick(() => {
      (global as any).fetch.mockClear();
      done();
    });
  });
});