
package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyApplicationAnalyticsResponse {

    private String month;
    private int totalApplications;
}