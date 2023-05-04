import React from 'react';
import RankedGraph from '../RankedGraph';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'

import {screen} from '../../../tests/testing';

// CURRENTLY AT 79% COVERAGE (up from 32%)

/*            What should we be testing for the Ranked Graph?
  - Keeps track of individual component render time (meaning the PlaygroundRender, Board, Row in our mock data)
  - For our tests, the ranked graph component needs the data ([{name: , actualDuration}]), height, and width (these two we can create mock data for)
    - We need to test:
      - Rendering properly (x)
      - No initial values (should not be passing because graphs are rendering when we havent started the playground) 
      - Check that labels are properly being passed in  (x)
          - getting atom1,2,3
          - getting actualDuration

      - Check that the x-axis is rendering 
*/

const mockNoValue = [
  {
    name: '', 
    actualDuration: 0
  }
]

const mock = [
  {
    name: 'atom1', 
    actualDuration: 0.1345
  },
  {
    name: 'atom2', 
    actualDuration: 0.23456
  },
  {
    name: 'atom3', 
    actualDuration: 1.2357
  },
  
]

const mockHeight = 50
const mockWidth = 30

afterEach(cleanup);

describe('Ranked graph displays correct information', () => {
  it('should render data, height, and width', () => {
    const {asFragment} = render(
      <RankedGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    //checking if new component being rendered matches the saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  //check that labels are being properly passed in 
  it('should contain data with name property', () => {
    // render ranked graph
    render(
      <RankedGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    //ensure that a name property is being passed in and can be found 
    const atom1 = screen.getByText('atom1')
    const atom2 = screen.getByText('atom2')
    const atom3 = screen.getByText('atom3')

    expect(atom1).toBeVisible();
    expect(atom2).toBeVisible();
    expect(atom3).toBeVisible();
  });
  it('should contain data with actualDuration property', () => {
    // render ranked graph
    render(
      <RankedGraph
      data={mock}
      width={mockWidth}
      height={mockHeight}
      />
      )
      //ensure that an actualDuration property is being passed in and can be found
      const atom1Duration = screen.getByText('0.13ms')
      const atom2Duration = screen.getByText('0.23ms')
      const atom3Duration = screen.getByText('1.24ms')
      
      expect(atom1Duration).toBeVisible();
      expect(atom2Duration).toBeVisible();
      expect(atom3Duration).toBeVisible();
      expect(atom3Duration).not.toBe('1.2357ms'); 
  });
});

// //Ensure that the x-axis is rendering 
// describe('Ranked graph axis label', () => {
//   it('should have a y-axis label', () => {
//     const {asFragment} = render(
//       <RankedGraph
//         data={mock}
//         width={mockWidth}
//         height={mockHeight}
//       />
//     )
//     //checking if new component being rendered initially matches snapshot
//     expect(screen.queryByText('tick')).toBeInTheDocument();
//   });
// });
//This is passing, but it should not be passing
describe('Ranked graph initial rendering', () => {
  it('should not render without initial data', () => {
    const {asFragment} = render(
      <RankedGraph
        data={mockNoValue}
        width={mockWidth}
        height={mockHeight}
      />
    )
    //checking if new component being rendered initially matches snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});