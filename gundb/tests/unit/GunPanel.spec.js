import { shallowMount } from '@vue/test-utils';
import GunPanel from '@/components/GunPanel.vue';
jest.setTimeout(300000);

describe('GunPanel.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(GunPanel, {
      propsData: {
        types: 'test'
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('测试uploadOption是否正常显示', () => {
    expect(wrapper.find('.option')).not.toBeNull();
  });
});
