package com.luckyjing.repository;

import com.luckyjing.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by luckyjing on 16/5/15.
 */
public interface UserRepository extends JpaRepository<UserEntity,Integer> {

}
