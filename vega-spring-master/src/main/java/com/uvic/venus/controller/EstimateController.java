package com.uvic.venus.controller;

import com.uvic.venus.model.Estimate;
import com.uvic.venus.repository.EstimateDAO;
import com.uvic.venus.storage.StorageService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/estimate")
public class EstimateController {

  @Autowired
  EstimateDAO estimateDAO;

  @Autowired
  DataSource dataSource;

  @Autowired
  StorageService storageService;

  @RequestMapping(value = "/fetchestimates", method = RequestMethod.GET)
  public ResponseEntity<?> fetchAllEstimates() {
    List<Estimate> estimateList = estimateDAO.findAll();
    return ResponseEntity.ok(estimateList);
  }

  @RequestMapping(value = "/submitestimate", method = RequestMethod.POST)
  public ResponseEntity<?> submitEstimate(
    @RequestParam("packageType") String packageType,
    @RequestParam("companySize") String companySize,
    @RequestParam("email") String email,
    @RequestParam("alwaysSupport") boolean alwaysSupport,
    @RequestParam("dataBackup") boolean dataBackup,
    @RequestParam("dataEncryption") boolean dataEncryption
  ) {
    Estimate estimate = new Estimate(
      packageType,
      companySize,
      email,
      alwaysSupport,
      dataBackup,
      dataEncryption
    );
    estimateDAO.save(estimate);
    return ResponseEntity.ok(estimate);
  }
}
