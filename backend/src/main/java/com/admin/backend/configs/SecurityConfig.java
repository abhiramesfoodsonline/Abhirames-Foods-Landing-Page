package com.admin.backend.configs;

import com.admin.backend.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtFilter jwtFilter;
    
    
// TODO CAUSATION: UNCOMMENT THE BELOW CODE IF THE AUTOWIRED IN  'jwtFilter' AND 'userDetailsService' FAILS.
    
//    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtFilter jwtFilter) {
//        this.userDetailsService = userDetailsService;
//        this.jwtFilter = jwtFilter;
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll()

                        // TODO Allow creating the FIRST admin user openly (Disable this line later for production!)
                        .requestMatchers(HttpMethod.POST, "/api/admin-users").permitAll()
                        .requestMatchers("/api/admin-users", "/api/admin-users/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")



                        // About Us Access
                        .requestMatchers(HttpMethod.GET, "/api/about-us").permitAll()
                        .requestMatchers("/api/about-us", "/api/about-us/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Category Access
                        .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                        .requestMatchers("/api/categories", "/api/categories/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Product Access
                        .requestMatchers(HttpMethod.GET, "/api/products").permitAll()
                        .requestMatchers("/api/products", "/api/products/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // FAQs Access
                        .requestMatchers(HttpMethod.GET, "/api/faqs").permitAll()
                        .requestMatchers("/api/faqs", "/api/faqs/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Contact Us Access
                        .requestMatchers(HttpMethod.GET, "/api/contactUs").permitAll()
                        .requestMatchers("/api/contact-us", "/api/contact-us/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Return Refund Access
                        .requestMatchers(HttpMethod.GET, "/api/refund-policy").permitAll()
                        .requestMatchers("/api/refund-policy", "/api/refund-policy/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Social Media Access
                        .requestMatchers(HttpMethod.GET, "/api/social-media").permitAll()
                        .requestMatchers("/api/social-media", "/api/social-media/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // Company Profile Access
                        .requestMatchers(HttpMethod.GET, "/api/company-profile").permitAll()
                        .requestMatchers("/api/company-profile", "/api/company-profile/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

                        // CMS Access
                        .requestMatchers(HttpMethod.GET, "/api/cms").permitAll()
                        .requestMatchers("/api/cms", "/api/cms/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")
                        
                        // Admin Management Access
                        .requestMatchers("/api/admin-users/**").hasAuthority("SUPER_ADMIN")

                        
                        .anyRequest().authenticated()
                )
                .sessionManagement(
                        sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}