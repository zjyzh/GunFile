import { shallowMount, createLocalVue } from '@vue/test-utils';
import Password from '@/components/Password.vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue(); // 有报错，缺少identity-obj-proxy能识别CSS的插件
localVue.use(ElementUI);
jest.setTimeout(300000);

describe('Password.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Password, {
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('submit函数测试', () => {
    wrapper.vm.submit();
    expect(wrapper.emitted().check).toBeTruthy();
    expect(wrapper.emitted().check.length).toBe(1);
  });

  it('confirmPassword函数测试', () => {
    wrapper.vm.confirmPassword();
    expect(wrapper.vm.isPassword).toBeTruthy();
  });

  it('confirmPasswords函数测试', () => {
    wrapper.vm.is_password = true;
    wrapper.vm.confirmPasswords();
    expect(wrapper.vm.isPassword).toBeFalsy();
  });
});
