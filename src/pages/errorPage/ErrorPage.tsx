import './errorPage.scss';

function ErrorPage() {
  return (
    <section className="error">
      <div className="error__wrapper wrapper">
        <p className="error__404">404</p>
        <h1 className="error__heading">Page Not Found</h1>
        <p className="error__text">
          Page your are looking for doesn&apos;t exist
        </p>
        <div className="error__picture" />
      </div>
    </section>
  );
}

export default ErrorPage;
