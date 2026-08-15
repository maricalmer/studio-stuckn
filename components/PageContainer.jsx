export default function PageContainer({ children, backgroundColor }) {
  return (
    <div lang="en" className={`absolute top-0 ${backgroundColor} h-fit w-screen`}>
      {children}
    </div>
  );
};
