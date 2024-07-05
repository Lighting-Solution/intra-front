import create from 'zustand';

const useGroup = create((set) => ({
  groupId: null,
  title: '사내 주소록',
  subTitle: '전체 주소록',
  setGroupId: (newGroupId) => set({ groupId: newGroupId }),
  setTitle: (newTitle) => set({ title: newTitle }),
  setSubTitle: (newSubTitle) => set({ subTitle: newSubTitle }),
}));

export default useGroup;
