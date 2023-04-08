package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@Embeddable
@ToString
public class Address  {

private int pincode=000000;
private String village="Not yet Added";
@Column(length = 20)
private String city="Not yet Added";
@Column(length = 20)
private String state="Not yet Added";

private String addressLine1="Not yet Added";
private String addressLine2="Not yet Added";

}
