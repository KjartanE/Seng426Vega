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
    private Boolean alwaysSupport;
    private Boolean dataBackup;
    private Boolean dataEncryption;

    public Estimate(String packageType, String companySize, String email, Boolean alwaysSupport, Boolean dataBackup, Boolean dataEncryption) {
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

    public Boolean getAlwaysSupport() {
        return alwaysSupport;
    }

    public void setAlwaysSupport(Boolean alwaysSupport) {
        this.alwaysSupport = alwaysSupport;
    }

    public Boolean getDataBackup() {
        return dataBackup;
    }

    public void setDataBackup(Boolean dataBackup) {
        this.dataBackup = dataBackup;
    }

    public Boolean getDataEncryption() {
        return dataEncryption;
    }

    public void setDataEncryption(Boolean dataEncryption) {
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
