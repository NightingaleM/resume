// 导航栏*******************************************
function ShowNavigation() {
  this.$canva = $('#canva')
  this.$navigations = $('.navigation-li')
  this.thisPage = 0
  this.actionKey = false
  this.navigationListener()
  this.ResizeChange()
  this.ScrollChange()
}
ShowNavigation.prototype.ScrollChange = function () {
  let _this = this
  let nextPage
  this.$canva.on('mousewheel', null, XXXfn)
  function XXXfn(e) {
    if (e.originalEvent.wheelDelta) {
      if (parseInt(e.originalEvent.wheelDelta) > 0) {
        nextPage = _this.page() - 1
        _this.ChangePage(nextPage)
      } else {
        nextPage = _this.page() + 1
        _this.ChangePage(nextPage)
      }
    }
  }
}

ShowNavigation.prototype.ResizeChange = function () {
  let _this = this
  $(window).on('resize', function () {
    _this.ChangePage(_this.thisPage)
  })
}
ShowNavigation.prototype.navigationListener = function () {
  let _this = this
  this.$navigations.each(function () {
    $(this).on('click', function () {
      _this.thisPage = $(this).index()
      _this.ChangePage(_this.thisPage)
    })
  })
}
ShowNavigation.prototype.ChangePage = function (index) {
  if (this.actionKey === true) return
  if (index > 3) return
  if (index < 0) return
  this.actionKey = true
  let _this = this
  this.$canva.on('transitionend', function callBack() {
    _this.$canva.off('transitionend', callBack)
    _this.actionKey = false
  })
  changeTop = -index * this.windowHeight()
  this.$canva.css('margin-top', changeTop)
  this.$navigations.eq(index).addClass('active-li')
    .siblings().removeClass('active-li')
}

ShowNavigation.prototype.canvaTop = function () {
  return parseInt(this.$canva.css('margin-top'), 10)
}

ShowNavigation.prototype.windowHeight = function () {
  return $('#content').height()
}

ShowNavigation.prototype.page = function () {
  return parseInt((((4 * this.windowHeight() - this.canvaTop()) / this.windowHeight() - 4) % 4))
}

var navigation = new ShowNavigation()

// 作品动画*******************************************
function Production() {
  this.$animations = $('.animation')
  this.$productions = $('.productions')
  this.$abstract = $('.productions>p')
  this.$imgs = $('.production-imgs')
  this.key1 = 0
  this.key2 = 0
  this.addListener()
}
Production.prototype.addListener = function () {
  var _this = this
  this.$animations.each(function () {
    $(this).on('mouseenter', function () {
      _this.bigPic($(this))
    })
    $(this).on('mouseleave', function () {
      _this.smallPic($(this))
    })
  })
}
Production.prototype.bigPic = function (target) {
  var color = 'rgba(60,147,114,0.3)'
  target.find('.productions').css('background-color', color)
  target.find('img').css('width', '105%')
  target.find('h2').css('top', '40%')
  target.find('.productions>p').css('opacity', '1')
    .css('top', '55%')
}

Production.prototype.smallPic = function (target) {
  var color = 'rgba(0,0,0,0.3)'
  target.find('.productions').css('background-color', color)
  target.find('img').css('width', '100%')
  target.find('h2').css('top', '50%')
  target.find('.productions>p').css('opacity', '0')
    .css('top', '30%')
}


var production = new Production()

// 技能动画*****************************
function SkillAction() {
  this.$skillBox = $('#skill-ul')
  this.$intreset = $('#skill-ul .intreset')
  this.$ability = $('#skill-ul .ability')
  this.$skillInfo = $('#skill-info')
  this.$targetInfos = $('#skill-info>ul>li')
  this.$allInfo = $('#skill-ul .intreset,#skill-ul .ability')
  this.ShowInfo()
}

SkillAction.prototype.ShowInfo = function () {
  let _this = this
  this.$allInfo.on('mouseenter', function () {
    let parentIndex = $(this).parent('.skill-li').index()
    _this.$skillInfo.show()
      .css('background-color', 'rgba(90,180,79,0.5)')
    _this.$targetInfos.eq(parentIndex)
      .addClass('activit-skill')
      .siblings().removeClass('activit-skill')
    _this.MoveInfo()
    _this.ShowPercent(this)
  }).on('mouseout', function () {
    _this.$skillInfo.hide()
    _this.HidePercent(this)
  })
}

SkillAction.prototype.MoveInfo = function () {
  let _this = this
  this.$allInfo.on('mousemove', function (a) {
    _this.$skillInfo.css('top', a.clientY + 10)
      .css('left', a.clientX - 270)
    if ($('#skill').width() - _this.$skillInfo[0].offsetLeft < _this.$skillInfo.width()) {
      _this.$skillInfo.css('left', a.clientX - 335)
    }
    if ($('#skill').height() - _this.$skillInfo[0].offsetTop < _this.$skillInfo.height()) {
      _this.$skillInfo.css('top', a.clientY - _this.$skillInfo.height() + 10)
    }

  })
}
SkillAction.prototype.ShowPercent = function (target) {
  $(target).find('span').show(300, 'swing')
}
SkillAction.prototype.HidePercent = function (target) {
  $(target).find('span').hide(300, 'swing')
}

var skill = new SkillAction()