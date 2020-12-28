import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';

function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading && <div>加载中...</div>;
}

export default function({ store, component, models: m = () => [] }) {
  return loadable(
    () =>
      Promise.all(m()).then(models => {
        models.forEach(model => {
          store.injectModel(model.default.namespace, model.default);
        });

        return component();
      }),
    {
      fallback: <Loading />,
    },
  );
}
