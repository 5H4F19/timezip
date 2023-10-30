package com.wallet_templete;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  ActivityResultLauncher<String[]> mPermissionResultLauncher;
  private boolean isReadPermissionGranted = false;
  private boolean isWritePermissionGranted = false;
  @Override
  protected String getMainComponentName() {
    return "wallet_templete";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mPermissionResultLauncher = registerForActivityResult(new ActivityResultContracts.RequestMultiplePermissions(), new ActivityResultCallback<Map<String, Boolean>>() {
      @Override
      public void onActivityResult(Map<String, Boolean> result) {
        if(result.get(Manifest.permission.READ_EXTERNAL_STORAGE) != null){
          isReadPermissionGranted = result.get(Manifest.permission.READ_EXTERNAL_STORAGE);
        }
        if(result.get(Manifest.permission.WRITE_EXTERNAL_STORAGE) != null){
          isWritePermissionGranted = result.get(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }
      }
    });
    requestPermission();
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  public void requestPermission(){
    isReadPermissionGranted = ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
    isWritePermissionGranted = ContextCompat.checkSelfPermission(getApplicationContext(),Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

    List<String> permissionRequest = new ArrayList<String>();

    if(!isReadPermissionGranted) permissionRequest.add(Manifest.permission.READ_EXTERNAL_STORAGE);
    if(!isWritePermissionGranted) permissionRequest.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);

    if(!permissionRequest.isEmpty()){
      mPermissionResultLauncher.launch(permissionRequest.toArray(new String[0]));
    }
  }

}
