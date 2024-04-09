package com.example.zoomapsearchadntest.compositeKeys;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class EmployeeDataKey implements Serializable {

    private String login;
    private String password;

}
