import './skeletons.scss';

function SkeletonBrand() {
  return (
    <ul className="skeleton-brand">
      <div className="skeleton-brand-item">
        <div className="square" />
        <div className="line-brand" />
      </div>
      <div className="skeleton-brand-item">
        <div className="square" />
        <div className="line-brand" />
      </div>
      <div className="skeleton-brand-item">
        <div className="square" />
        <div className="line-brand" />
      </div>
      <div className="skeleton-brand-item">
        <div className="square" />
        <div className="line-brand" />
      </div>
    </ul>
  );
}

export default SkeletonBrand;
