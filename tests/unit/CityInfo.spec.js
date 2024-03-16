// Import Vue and the component being tested
import { mount } from '@vue/test-utils';
import CityInfo from '../../src/components/CityInfo.vue';

describe('CityInfo.vue', () => {
  // Test if the component renders correctly
  it('renders correctly', () => {
    const city = {
      name: 'London',
      description: 'London is the capital of England.',
      weather: 'Partly cloudy, 15°C',
      forecast: [
        { date: '2024-03-16', day: { condition: { text: 'Sunny' }, maxtemp_c: 18, mintemp_c: 10, avgtemp_c: 15 } }
      ]
    };
    const wrapper = mount(CityInfo, {
      propsData: { city }
    });
    expect(wrapper.exists()).toBe(true);
  });

  // Test if city description is displayed
  it('displays city description', () => {
    const city = {
      name: 'London',
      description: 'London is the capital of England.',
      weather: 'Partly cloudy, 15°C',
      forecast: [
        { date: '2024-03-16', day: { condition: { text: 'Sunny' }, maxtemp_c: 18, mintemp_c: 10, avgtemp_c: 15 } }
      ]
    };
    const wrapper = mount(CityInfo, {
      propsData: { city }
    });
    expect(wrapper.text()).toContain('London is the capital of England.');
  });

  // Test if city weather is displayed
  it('displays city weather', () => {
    const city = {
      name: 'London',
      description: 'London is the capital of England.',
      weather: 'Partly cloudy, 15°C',
      forecast: [
        { date: '2024-03-16', day: { condition: { text: 'Sunny' }, maxtemp_c: 18, mintemp_c: 10, avgtemp_c: 15 } }
      ]
    };
    const wrapper = mount(CityInfo, {
      propsData: { city }
    });
    expect(wrapper.text()).toContain('Partly cloudy, 15°C');
  });

  // Test if forecast dropdown is displayed
  it('displays forecast dropdown', () => {
    const city = {
      name: 'London',
      description: 'London is the capital of England.',
      weather: 'Partly cloudy, 15°C',
      forecast: [
        { date: '2024-03-16', day: { condition: { text: 'Sunny' }, maxtemp_c: 18, mintemp_c: 10, avgtemp_c: 15 } }
      ]
    };
    const wrapper = mount(CityInfo, {
      propsData: { city }
    });
    const dropdown = wrapper.find('select');
    expect(dropdown.exists()).toBe(true);
    expect(dropdown.findAll('option')).toHaveLength(2); // Default + 1 forecast date
  });

  // Test if forecast details are displayed when selecting a date
  it('displays forecast details when selecting a date', async () => {
    const city = {
      name: 'London',
      description: 'London is the capital of England.',
      weather: 'Partly cloudy, 15°C',
      forecast: [
        { date: '2024-03-16', day: { condition: { text: 'Sunny' }, maxtemp_c: 18, mintemp_c: 10, avgtemp_c: 15 } }
      ]
    };
    const wrapper = mount(CityInfo, {
      propsData: { city }
    });
    await wrapper.find('select').setValue('0');
    expect(wrapper.text()).toContain('Forecast for 2024-03-16:');
    expect(wrapper.text()).toContain('Weather: Sunny');
    expect(wrapper.text()).toContain('Max Temperature: 18°C');
    expect(wrapper.text()).toContain('Min Temperature: 10°C');
    expect(wrapper.text()).toContain('Average Temperature: 15°C');
  });
});
