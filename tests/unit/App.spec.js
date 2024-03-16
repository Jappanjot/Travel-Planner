// Import Vue and the component being tested
import { mount } from '@vue/test-utils';
import App from '../../src/App.vue';
import { flushPromises } from '@vue/test-utils';

const mockData = {
    extract: 'Example mock description of a city on wikipedia',
    current: {
        condition: {
          text: 'Clear',
        },
        temp_c: 12,
      },
      forecast: {
        forecastday: [
          {
            date: '2024-03-15',
            day: {
              maxtemp_c: 13.4,
              mintemp_c: 8.1,
              condition: {
                text: 'Patchy rain nearby',
              },
            },
          },
          // Include more forecast days if needed
        ],
      },
};
// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('App.vue', () => {
  // Test if the component renders correctly
  it('renders correctly', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });

  // Test if cities dropdown is rendered correctly
  it('renders cities dropdown', () => {
    const wrapper = mount(App);
    const dropdown = wrapper.find('select');
    expect(dropdown.exists()).toBe(true);
    expect(dropdown.findAll('option')).toHaveLength(6); // 5 cities + default option
  });

  // Test if CityInfo component is rendered when a city is selected
  it('renders CityInfo component when a city is selected', async () => {
    const wrapper = mount(App);
    const dropdown = wrapper.find('select');
    const options = dropdown.findAll('option');
    await options.at(1).setSelected(); // Click the second option
    await flushPromises;
    // Remount the component to reflect the updated state
    await wrapper.vm.$nextTick(); // Ensure Vue has updated the DOM
    expect(wrapper.text()).toContain('Clear, 12°C');
  });
});
