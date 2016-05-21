package com.luckyjing.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by luckyjing on 16/5/15.
 */
@Controller
@RequestMapping(value = "/api")
public class MainController {

    @RequestMapping(value = "/demo", method = RequestMethod.GET)
    public String demoView() {
        return "demo";
    }
}
