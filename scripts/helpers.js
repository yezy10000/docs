'use strict';

var pathFn = require('path');
var _ = require('lodash');
var url = require('url');
var cheerio = require('cheerio');
var lunr = require('lunr');
var localizedPath = ['docs'];

function startsWith(str, start){
  return str.substring(0, start.length) === start;
}

function replaceLangInPath (path, lang, keepCN) {
  if (!keepCN && lang == 'zh-cn') {lang = ''};
  return path.replace(/(zh-cn|en|\{lang\})/g, lang).replace('//', '/');
}

hexo.extend.helper.register('page_nav', function(){
  var type = this.page.canonical_path.split('/')[0];
  var sidebar = this.site.data.sidebar[type];
  var path = pathFn.basename(this.path);
  var list = {};
  var prefix = 'sidebar.' + type + '.';

  for (var i in sidebar){
    for (var j in sidebar[i]){
      list[sidebar[i][j]] = j;
    }
  }

  var keys = Object.keys(list);
  var index = keys.indexOf(path);
  var result = '';

  if (index > 0){
    result += '<a href="' + keys[index - 1] + '" class="article-footer-prev" title="' + this.__(prefix + list[keys[index - 1]]) + '">' +
      '<i class="fa fa-chevron-left"></i><span>' + this.__('page.prev') + '</span></a>';
  }

  if (index < keys.length - 1){
    result += '<a href="' + keys[index + 1] + '" class="article-footer-next" title="' + this.__(prefix + list[keys[index + 1]]) + '">' +
      '<span>' + this.__('page.next') + '</span><i class="fa fa-chevron-right"></i></a>';
  }

  return result;
});

hexo.extend.helper.register('doc_sidebar', function(className){
  var type = this.page.canonical_path.split('/')[0];
  var sidebar = this.site.data.sidebar[type];
  var path = pathFn.basename(this.path);
  var result = '';
  var self = this;
  var prefix = 'sidebar.' + type + '.';

  _.each(sidebar, function(menu, title){
    result += '<strong class="' + className + '-title">' + self.__(prefix + title) + '</strong>';

    _.each(menu, function(link, text){
      var itemClass = className + '-link';
      if (link === path) itemClass += ' current';

      result += '<a href="' + link + '" class="' + itemClass + '">' + self.__(prefix + text) + '</a>';
    })
  });

  return result;
});

hexo.extend.helper.register('header_menu', function(className){
  var menu = this.site.data.menu;
  var result = '';
  var self = this;
  var lang = this.page.lang;

  _.each(menu, function(path, title){
    result += '<li class="' + className + '-item">';
    result += '<a href="' + self.url_for(replaceLangInPath(path, lang)) + '" class="' + className + '-link">' + self.__('menu.' + title) + '</a>';
    result += '</li>';
  });

  return result;
});

hexo.extend.helper.register('canonical_url', function(lang){
  var path = this.page.canonical_path;
  if (lang && lang !== 'zh-cn') path = lang + '/' + path;

  return this.config.url + '/' + path;
});

hexo.extend.helper.register('url_for_lang', function(path){
  var lang = this.page.lang;
  var url = this.url_for(path);

  return replaceLangInPath(url, lang);
});

hexo.extend.helper.register('raw_link', function(path){
  console.log('raw'+path);
  //path = this.page.lang + '/' + path.replace(/master\/walle-web.io\/docs\/((zh\-cn|en)\/)?/, '');
  path = path.replace(/master\/walle-web.io\/docs\/((zh\-cn|en)\/)?/, '');

  return 'https://github.com/meolu/docs/edit/' + path.replace('//', '/');
});

hexo.extend.helper.register('page_anchor', function(str){
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function(){
    var id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });

  return $.html();
});

hexo.extend.helper.register('lunr_index', function(data){
  var index = lunr(function(){
    this.field('name', {boost: 10});
    this.field('tags', {boost: 50});
    this.field('description');
    this.ref('id');
  });

  _.sortBy(data, 'name').forEach(function(item, i){
    index.add(_.assign({id: i}, item));
  });

  return JSON.stringify(index.toJSON());
});

hexo.extend.helper.register('lang_name', function(lang){
  var data = this.site.data.languages[lang];
  return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function(){
  var lang = this.page.lang;
  var data = this.site.data.languages[lang];

  return data.disqus_lang || lang;
});