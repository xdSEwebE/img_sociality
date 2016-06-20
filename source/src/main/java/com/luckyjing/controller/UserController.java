package com.luckyjing.controller;

import com.luckyjing.Res;
import com.luckyjing.model.UserEntity;
import com.luckyjing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by luckyjing on 16/5/15.
 */
@Controller
@RequestMapping(value = "/api")
public class UserController {
    // 自动装配数据库接口，不需要再写原始的Connection来操作数据库
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public String getUsers(ModelMap modelMap) {
        // 查询user表中所有记录
        List<UserEntity> userList = userRepository.findAll();

        // 将所有记录传递给要返回的jsp页面，放在userList当中
        modelMap.addAttribute("demo", 123);
        modelMap.addAttribute("userList", userList);

        // 返回pages目录下的admin/users.jsp页面
        return "admin/users";
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public
    @ResponseBody
    List<UserEntity> getAllUsers() {
        // 查询user表中所有记录
        List<UserEntity> userList = userRepository.findAll();

        // 返回pages目录下的admin/users.jsp页面
        return userList;
    }

    @RequestMapping(value = "/admin/users/add", method = RequestMethod.GET)
    public String getUser() {
        return "admin/addUser";
    }

    // post请求，处理添加用户请求，并重定向到用户管理页面
    @RequestMapping(value = "/admin/users/add", method = RequestMethod.POST)
    public
    @ResponseBody
    Res addUserPost(@ModelAttribute("user") UserEntity userEntity) {
        // 注意此处，post请求传递过来的是一个UserEntity对象，里面包含了该用户的信息
        // 通过@ModelAttribute()注解可以获取传递过来的'user'，并创建这个对象

        // 数据库中添加一个用户，该步暂时不会刷新缓存
        //userRepository.save(userEntity);

        // 数据库中添加一个用户，并立即刷新缓存
        userRepository.saveAndFlush(userEntity);
        return new Res(200);
    }
}
