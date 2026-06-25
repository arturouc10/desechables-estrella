export default function PageLayout({ children }) {
  return (
    <div className="content-area">
      <div className="page-body">
        <main className="main-content texto">
          {children}
        </main>
      </div>
    </div>
  );
}
