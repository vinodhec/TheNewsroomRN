
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// expo
import expo.modules.ExpoModulesPackage;
// react-native-date-picker
import com.henninghall.date_picker.DatePickerPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-tts
import net.no_mad.tts.TextToSpeechPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-view-shot
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new ExpoModulesPackage(),
      new DatePickerPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new PagerViewPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new SvgPackage(),
      new TextToSpeechPackage(),
      new VectorIconsPackage(),
      new ReactVideoPackage(),
      new RNViewShotPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
