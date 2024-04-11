(function () {
  // eslint-disable-next-line no-var
  var uniFrame = {
    readyQueue: [],
    isReady: false,
    uniframeIsReady: false,
    uniframeV2IsReady: false,
    execQueue() {
      if (
        (!window.__Bybit_Uniframe_JSONP_CALLBACK__ ||
          uniFrame.uniframeIsReady) &&
        uniFrame.uniframeV2IsReady
      ) {
        uniFrame.isReady = true;
        while (uniFrame.readyQueue && uniFrame.readyQueue.length > 0) {
          uniFrame.readyQueue.shift()(window.BybitUniFrame);
        }
      }
    },
    ready(cb) {
      if (typeof cb === "function") {
        uniFrame.isReady ? cb(uniFrame) : uniFrame.readyQueue.push(cb);
      }
    },
  };
  window.BybitUniFrame = uniFrame;
  let { hostname } = location;
  const isProdOrTestnet =
    /^[^.]+\.[^.]+\.[^.]+$/.test(hostname) ||
    /^[^.]+\.[^.]+\.[^.]+\.(hk|uae|us|uk|jp|fr|de|au|ca|br|in|ru)$/.test(
      hostname
    );
  const isTestnet = isProdOrTestnet && /^[^.]*testnet[^.]*\./.test(hostname);
  const isProd = isProdOrTestnet && !isTestnet;
  const localStorageResourcePathV2 = window.localStorage.getItem(
    "UNIFRAME_v2_core_resource_path"
  );

  const prefixV2 =
    isProd || isTestnet
      ? `//${hostname}/`
      : localStorageResourcePathV2 || "//www.public-test-1.bybit.com/";
  const scriptV2 = document.createElement("script");
  scriptV2.src = `${prefixV2}uniframe-micro/uniframe.js?_=${Date.now()}`;
  document.getElementsByTagName("head")[0].appendChild(scriptV2);

  if (isProd || isTestnet) {
    const script = document.createElement("script");
    script.src = `/marvel-root-sw-loader.js`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
})();
