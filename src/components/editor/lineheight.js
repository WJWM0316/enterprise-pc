/* eslint-disable */
import E from 'wangeditor'
// 用 createMenu 方法创建菜单
E.createMenu(function (check) {
  // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
  const menuId = 'lineheight'

  // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
  if (!check(menuId)) {
    return
  }

  // this 指向 editor 对象自身
  const editor = this

  // 由于浏览器自身不支持 lineHeight 命令，因此要做一个hook
  editor.commandHooks.lineHeight = function (value) {
    const rangeElem = editor.getRangeElem()
    const targetElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,pre')
    if (!targetElem) {
      return
    }
    $(targetElem).css('line-height', value + '')
  }

  // 创建 menu 对象
  const menu = new E.Menu({
    editor: editor, // 编辑器对象
    id: menuId, // 菜单id
    title: '行高', // 菜单标题
    commandName: 'lineHeight', // 命令名称

    // 正常状态和选中装下的dom对象，样式需要自定义
    $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>'),
    $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-text-height"></i></a>')
  })

  // 数据源
  const data = {
    // 格式： 'value' : 'title'
    '1.0': '1.0倍',
    '1.5': '1.5倍',
    '1.8': '1.8倍',
    '2.0': '2.0倍',
    '2.5': '2.5倍',
    '3.0': '3.0倍'
  }

  // 为menu创建droplist对象
  const tpl = '<span style="line-height:{#commandValue}">{#title}</span>'
  menu.dropList = new E.DropList(editor, menu, {
    data: data, // 传入数据源
    tpl: tpl // 传入模板
  })

  // 增加到editor对象中
  editor.menus[menuId] = menu
})
