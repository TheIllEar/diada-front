const /**
   * Получаем изображение
   */
  _getImg = (_img) => {
    let _imgDefult = [],
      _imgSmall = [];

    if (_img) {
      if (_img[0]) {
        _img = _img[0];
      }
      _imgDefult = _img.attributes.formats.hasOwnProperty('medium') ? _img.attributes.formats.medium.url : _img.attributes.formats.thumbnail.url;
      _imgSmall = _img.attributes.formats.hasOwnProperty('small') ? _img.attributes.formats.small.url : _imgDefult;
      if (_imgDefult && _imgSmall) {
        return { _imgDefult, _imgSmall };
      }
    }
    return { _imgDefult, _imgSmall };
  },
  /**
   * Получаем изображения
   */
  _getImages = (_images) => {
    let _defultImages = [],
      _smallImages = [];

    if (_images) {
      _images.forEach((_img) => {
        let _imgDefult = _img.attributes.formats.hasOwnProperty('medium') ? _img.attributes.formats.medium.url : _img.attributes.formats.thumbnail.url,
          _imgSmall = _img.attributes.formats.hasOwnProperty('small') ? _img.attributes.formats.small.url : _imgDefult;

        if (_imgDefult && _imgSmall) {
          _defultImages.push(_imgDefult);
          _smallImages.push(_imgSmall);
        }
      });
      if (_defultImages.length && _smallImages.length) {
        return { _defultImages, _smallImages };
      }
    }
    return { _defultImages, _smallImages };
  },
  /**
   * Получаем видео
   */
  _getVideos = (videos) => {
    if (videos) {
      let _videos = [];
      videos.forEach((_video) => {
        let url = _video.attributes.hasOwnProperty('url') ? _video.attributes.url : 'url_to_defult_img',
          ext = _video.attributes.hasOwnProperty('ext') ? _video.attributes.ext : '',
          name = _video.attributes.hasOwnProperty('name') ? _video.attributes.name : '',
          mime = _video.attributes.hasOwnProperty('mime') ? _video.attributes.mime : '',
          previewUrl = _video.attributes.hasOwnProperty('previewUrl') ? _video.attributes.previewUrl : '';

        if (url && ext && name && mime && previewUrl) {
          _videos.push({ url, ext, name, mime, previewUrl });
        }
      });
      if (_videos.length) {
        return { _videos };
      }
    } else {
      return [];
    }
  },
  /**
   * Получаем проекты
   */
  _getProjects = (_projects) => {
    const projects = [];
    _projects.data.forEach((_project, i) => {
      const project = {
        id: _project.id,
        slug: _project.attributes.Slug,
        title: _project.attributes.Title,
        service: _project.attributes.Service,
      };
      // Add img
      if (_project.attributes.Img && _project.attributes.Img.data) {
        let _img = _project.attributes.Img.data,
          { _imgDefult } = _getImg(_img),
          { _imgSmall } = _getImg(_img);
        project.img = _imgDefult;
        project.imgMobile = _imgSmall;
      }
      // Add contentType
      if (_project.attributes.ContentType) {
        project.contentType = _project.attributes.ContentType.split(',').map((type) => type.trim().toUpperCase());
      }
      projects.push(project);
    });
    return projects;
  };
export { _getImg, _getProjects, _getImages, _getVideos };
