import { shallowMount } from '@vue/test-utils';
import Linkbox from '@/components/Linkbox.vue';
jest.setTimeout(300000);

describe('Linkbox.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Linkbox, {
      propsData: {
        link: 'test'
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('copy函数测试', () => {
    expect(wrapper.html()).toContain('<input type="text" id="link-content">');
    document.getElementById = jest.fn();
    const input = wrapper.find('#link-content');
    document.getElementById.mockReturnValue(input);
    expect(input).toBeTruthy();
    input.select = jest.fn();
    input.select.mockReturnValue(wrapper.vm.link);
    document.execCommand = jest.fn();
    expect(wrapper.vm.copy()).not.toBeNull();
  });

  it('close函数测试', () => {
    wrapper.vm.close();
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close.length).toBe(1);
  });
});
