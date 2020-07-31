import { shallowMount, createLocalVue } from '@vue/test-utils';
import Upload from '@/views/Upload.vue';
import ElementUI from 'element-ui';
import MockDate from 'mockdate';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(MockDate);
jest.setTimeout(300000);

describe('Upload.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Upload, {
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('close函数测试', () => {
    wrapper.vm.reload = jest.fn();
    expect(wrapper.vm.show).toBeFalsy();
    wrapper.vm.show = true;
    expect(wrapper.vm.show).toBeTruthy();
    wrapper.vm.close();
    expect(wrapper.vm.show).toBeFalsy();
  });

  it('changeSureFile函数测试', () => {
    wrapper.vm.changeSureFile();
    expect(wrapper.vm.confirm_file).toBeTruthy();
  });

  it('changeSureFiles函数测试', () => {
    wrapper.vm.confirm_file = true;
    wrapper.vm.changeSureFiles();
    expect(wrapper.vm.confirm_file).toBeFalsy();
  });

  it('changeChooseFiles函数测试', () => {
    wrapper.vm.changeChooseFile();
    expect(wrapper.vm.is_confirm_file).toBeTruthy();
  });

  it('beforeRemove函数测试', () => {
    const file = { name: 'test' };
    expect(wrapper.vm.beforeRemove(file, 1)).not.toBeNull();
    wrapper.vm.isBig = true;
    expect(wrapper.vm.beforeRemove(file, 1)).not.toBeNull();
  });

  it('randomString函数测试', () => {
    expect(wrapper.vm.randomString(16).length).toEqual(16);
  });

  it('canclick函数测试', () => {
    expect(wrapper.vm.canclick()).toBeUndefined();
    wrapper.vm.number = 23;
    expect(wrapper.vm.canclick()).toBeTruthy();
  });

  it('choose函数部分测试', () => {
    expect(wrapper.vm.confirm()).toBeTruthy();
    wrapper.vm.file_name = 1;
    wrapper.vm.nmuber = 5;
    expect(wrapper.vm.confirm()).toBeTruthy();
  });

  it('SplitBase64函数测试', () => {
    expect(wrapper.vm.SplitBase64()).toBeNull();
    expect(wrapper.vm.SplitBase64('s', 0)).toBeNull();
    expect(wrapper.vm.SplitBase64('1')).toContain('1');
    expect(wrapper.vm.SplitBase64('123', 2)).toContain('12');
  });

  it('getCurrentDate函数测试', () => {
    const MockDate = require('mockdate');
    MockDate.set(1595825713000);
    const testDate = new Date();
    let testhour = testDate.getHours();
    if (testhour < 10) testhour = '0' + testhour;
    const teststr1 = testDate.getFullYear() +
      '-0' + (testDate.getMonth() + 1) +
      '-' + testDate.getDate();
    const teststr2 = testDate.getFullYear() +
      '-0' + (testDate.getMonth() + 1) +
      '-' + testDate.getDate() +
      ' ' + testhour +
      ':' + testDate.getMinutes() +
      ':' + testDate.getSeconds();
    expect(wrapper.vm.getCurrentDate(1)).toEqual(teststr1);
    expect(wrapper.vm.getCurrentDate(2)).toEqual(teststr2);
    MockDate.reset();
  });

  it('watch.select_status测试', () => {
    wrapper.vm.select_status = '1';
    expect(wrapper.vm.new_status).toEqual(0);
  });
});
