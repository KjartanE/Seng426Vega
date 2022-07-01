package com.uvic.venus.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="estimate")
public class Estimate {

    @Id
    private String packageType;
    private String companySize;
    private String email;
    private Bool alwaysSupport
    private Bool dataBackup;
    private Bool dataEncryption;

    public Estimate(String packageType, String companySize, String email, Bool alwaysSupport, Bool dataBackup, Bool dataEncryption) {
        this.packageType = packageType;
        this.companySize = companySize;
        this.email = email;
        this.alwaysSupport = alwaysSupport;
        this.dataBackup = dataBackup;
        this.dataEncryption = dataEncryption;
    }

    public Estimate() {
    }

    public String getPackageType() {
        return packageType;
    }

    public void setPackageType(String packageType) {
        this.packageType = packageType;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email;  }

    public Bool getAlwaysSupport() {
        return alwaysSupport;
    }

    public void setAlwaysSupport(Bool alwaysSupport) {
        this.alwaysSupport = alwaysSupport;
    }

    public Bool getDataBackup() {
        return dataBackup;
    }

    public void setDataBackup(Bool dataBackup) {
        this.dataBackup = dataBackup;
    }

    public Bool getDataEncryption() {
        return dataEncryption;
    }

    public void setDataEncryption(Bool dataEncryption) {
        this.dataEncryption = dataEncryption;
    }

    @Override
    public String toString() {
        return "Estimate{" +
                "packageType='" + packageType + '\'' +
                ", companySize='" + companySize + '\'' +
                ", email='" + email + '\'' +
                ", alwaysSupport=" + alwaysSupport +
                ", dataBackup=" + dataBackup +
                ", dataEncryption=" + dataEncryption +
                '}';
    }

}
