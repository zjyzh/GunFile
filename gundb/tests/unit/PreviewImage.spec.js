import { shallowMount, createLocalVue } from '@vue/test-utils';
import PreviewImage from '@/components/PreviewImage.vue';
import Viewer from 'v-viewer';

const localVue = createLocalVue();
localVue.use(Viewer);
jest.setTimeout(300000);

describe('PreviewImage.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PreviewImage, {
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('previewImagess函数测试', () => {
    wrapper.vm.previewImagess('test');
    expect(wrapper.vm.url).toEqual('test');
  });

  it('closeImage函数测试', () => {
    wrapper.vm.closeImage();
    expect(wrapper.emitted().closeImage).toBeTruthy();
    expect(wrapper.emitted().closeImage.length).toBe(1);
  });
});
