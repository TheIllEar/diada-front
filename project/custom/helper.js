const _getImg = (_img) => {
  if (_img) {
    let _imgDefult, _imgSmall;
    if (_img[0]) {
      _img = _img[0];
    }
    _imgDefult = _img.attributes.formats.hasOwnProperty('medium') ? _img.attributes.formats.medium.url : _img.attributes.formats.thumbnail.url;
    _imgSmall = _img.attributes.formats.hasOwnProperty('small') ? _img.attributes.formats.small.url : _imgDefult;
    if (_imgDefult && _imgSmall) {
      return { _imgDefult, _imgSmall };
    }
  }
};
export { _getImg };
