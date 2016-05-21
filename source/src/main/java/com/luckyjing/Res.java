package com.luckyjing;

import org.json.JSONObject;

/**
 * Created by luckyjing on 16/5/15.
 */
public class Res {
    private int status;
    private String msg;

    public Res(int status) {
        this.status = status;
        this.msg = "";
    }

    public Res(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }


    public void setStatus(int status) {
        this.status = status;
    }
}
